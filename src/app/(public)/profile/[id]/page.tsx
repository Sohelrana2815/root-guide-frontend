
type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const { id } = params;

    // TODO: replace with real fetch to your backend for public profile by id
    // const res = await fetch(`${process.env.API_URL}/users/${id}`);
    // const profile = await res.json();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Public Profile</h1>
            <p className="mb-2">Profile ID: {id}</p>
            <p className="text-sm text-muted-foreground">This is a placeholder public profile page. Replace with real data fetching and UI.</p>
        </div>
    );
}