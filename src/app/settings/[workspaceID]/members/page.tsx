interface IMembersSettingsProps {
  params: {
    workspaceID: string;
  };
}

export default async function MembersSettings({ params }: Readonly<IMembersSettingsProps>) {
  return (
    <main className="">
      <h1>Workspace Settings Members</h1>
    </main>
  );
}
