interface IWorkspaceSettingsProps {
  params: {
    workspaceID: string;
  };
}

export default async function WorkspaceSettings({ params }: Readonly<IWorkspaceSettingsProps>) {
  return (
    <main className="">
      <h1>Workspace Settings General</h1>
    </main>
  );
}
