import { revalidatePath } from "next/cache";

type MockUser = {
    id: number;
    name: string;
}

export default async function MockUsers() {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch('https://6750c36269dc1669ec1c35f6.mockapi.io/users');
    const users = await response.json();

    async function addUser(formData: FormData) {
        'use server'
        const name = formData.get('name') as string;
        const res = await fetch('https://6750c36269dc1669ec1c35f6.mockapi.io/users', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const newUser = await res.json();
        revalidatePath('/mock-users');
        console.log(newUser);
    }

    return (
        <div className="py-10">
            <form action={addUser} className="mb-4">
                <input
                    type="text"
                    name="name"
                    required
                    className="border p-2 mr-2 rounded " />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add user
                </button>
            </form>

            <ul className='grid grid-cols-4 gap-4 py-10'>
                {users.map((user: MockUser) => (
                    <li
                        key={user.id}
                        className='p-4 bg-white shadow-md rounded-lg text-gray-700'
                    >
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}