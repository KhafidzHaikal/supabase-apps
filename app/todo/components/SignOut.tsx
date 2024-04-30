import { Button } from "@/components/ui/button";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default function SignOut() {
  const logout = async () => {
    "use server"

    const supebase = await createSupabaseServerClient()
    await supebase.auth.signOut();
    redirect("/auth-server-action");
  }

  return (
    <form action={logout}>
      <Button>SignOut</Button>
    </form>
  );
}
