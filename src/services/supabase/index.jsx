import { createClient } from "@supabase/supabase-js";

export function SupabaseService() {
  const SUPABASE_URL = "https://uruhcuhghmquhocwxjae.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU0NTgwNCwiZXhwIjoxOTU5MTIxODA0fQ.vz3rLJdFW8Te4vFZyjqnkqXmjnOXHXa58Dngh_WsGC0";

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async function getMessages() {
    const { data, error } = await supabaseClient
      .from("chat")
      .select("*")
      .order("id", { ascending: false });

    return { data, error };
  }

  async function sendMessage({ username, message }) {
    const { data, error } = await supabaseClient
      .from("chat")
      .insert([{ username, message }]);

    return { data, error };
  }

  function syncMessages(onChange) {
    return supabaseClient
      .from("chat")
      .on("INSERT", ({ new: newMessage }) => onChange?.(newMessage))
      .subscribe();
  }

  return {
    getMessages,
    sendMessage,
    syncMessages,
  };
}
