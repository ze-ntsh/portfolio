"use client";
import { useState, useEffect, use, useMemo } from "react";
import { Octokit } from "@octokit/core";

interface FileStructureProps {
  username: string;
  repo: string;
  branch?: string;
  path?: string;
  token?: string | undefined;
}

export const FileStructure = ({
  username = "ze-ntsh",
  repo = "portfolio",
  branch = "master",
  path="",
  token = process.env.GITHUB_TOKEN,
}: FileStructureProps) => {
  const octokit = useMemo(() => new Octokit({ auth: token }), [token]);
  const [files, setFiles] = useState({});

  useEffect(() => {
    const getFilesRecursively = async (path: string) => {
      const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: username,
        repo: repo,
        path: path,
      });

      const fileData = response.data;
      const fileStructure: any = {};

      if (Array.isArray(fileData)) {
        fileData.forEach(async (file) => {
          if (file.type === "dir") {
            fileStructure[file.name] = await getFilesRecursively(`${path}/${file.name}`);
          } else {
            fileStructure[file.name] = file;
          }
        });
      }

      return fileStructure;
    };

    const fetchFiles = async () => {
      const structure = await getFilesRecursively("");
      setFiles(structure);
      console.log(structure);
    };

    fetchFiles();
  }, [octokit, username, repo, branch]);

  return (
    // Flexbox container to hold the file structure
    <div className="">
      {/* Sidebar */}
      <div className="">
        <div className="flex flex-col gap-2 p-4 bg-gray-100 w-1/4 h-screen overflow-y-auto">
          {Object.keys(files).map((file) => (
            <div key={file} className="p-2 hover:bg-gray-200 cursor-pointer">
              {file}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
