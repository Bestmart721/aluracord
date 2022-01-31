export function userFactory(object) {
  const { id, avatar_url, login, name } = object ?? {};

  return {
    id: id ?? "",
    avatarURL: avatar_url ?? "",
    username: login ?? "",
    name: name ?? "",
  };
}
