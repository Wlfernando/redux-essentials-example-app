import { useAppSelector } from "@/store/hooks";
import { selectUserById } from "../users/usersSlice";

interface PostAuthorProps {
  userId: string;
}

export default function PostAuthor({ userId }: PostAuthorProps) {
  const author = useAppSelector(selectUserById(userId));

  return <span>by {author?.name ?? 'Unknown author'}</span>
}