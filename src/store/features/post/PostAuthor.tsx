import { useAppSelector } from "@/store/hooks";
import { selectUserById } from "../users/usersSlice";

interface PostAuthorProps {
  userId: string;
  showPrefix?: boolean;
}

export default function PostAuthor({ userId, showPrefix = true }: PostAuthorProps) {
  const author = useAppSelector(selectUserById(userId));

  return <span>
    {showPrefix ? 'by ' : null}
    {author?.name ?? 'Unknown author'}
  </span>
}