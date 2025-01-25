import { currentUser, auth } from "@clerk/nextjs/server";

export default function Page() {
  const serverAction1 = async (formData: FormData) => {
    "use server";
    const user = await currentUser();
    console.info("Triggered server action 1", { user, formData });
  };

  const serverAction2 = async (formData: FormData) => {
    "use server";
    const authObject = await auth();
    console.info("Triggered server action 2", { authObject, formData });
  };

  const serverAction3 = async (formData: FormData) => {
    "use server";
    console.info("Triggered server action 3", { formData });
  };

  return (
    <main className="p-6 w-full flex flex-col gap-4 max-w-6xl ">
      <form action={serverAction1}>
        <h2>
          Click this button to fire a server action that calls currentUser()
        </h2>
        <button
          type="submit"
          className="bg-blue-600 text-lg text-white py-2 text-center align-middle rounded-lg w-48"
        >
          Server Action 1
        </button>
      </form>
      <form action={serverAction2}>
        <h2>Click this button to fire a server action that calls auth()</h2>
        <button
          type="submit"
          className="bg-blue-600 text-lg text-white py-2 text-center align-middle rounded-lg w-48"
        >
          Server Action 2
        </button>
      </form>
      <form action={serverAction3}>
        <h2>
          Click this button to fire a server action that does not call any clerk
          functions
        </h2>
        <button
          type="submit"
          className="bg-blue-600 text-lg text-white py-2 text-center align-middle rounded-lg w-48"
        >
          Server Action 3
        </button>
      </form>
    </main>
  );
}
