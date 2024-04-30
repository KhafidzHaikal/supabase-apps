import React from "react";
import CreateForm from "./components/CreateForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import SignOut from "./components/SignOut";
import { deleteTodoById, readTodo, updateTodoById } from "./actions";

export default async function Page() {

  const { data } = await readUserSession();

  if (!data.session) {
    return redirect("/auth-server-action");
  }

  const { data: todos } = await readTodo();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 space-y-5">
        <SignOut />
        <CreateForm />

        {todos?.map((todo, index) => {
          const deleteData = deleteTodoById.bind(null, todo.id);
          const updateData = updateTodoById.bind(
            null,
            todo.id,
            !todo.completed
          );

          return (
            <div key={index} className="flex items-center gap-6">
              <h1
                className={cn({
                  "line-through": todo.completed,
                })}>
                {todo.title}
              </h1>
              <form action={deleteData}>
                <Button>delete</Button>
              </form>
              <form action={updateData}>
                <Button>Update</Button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
