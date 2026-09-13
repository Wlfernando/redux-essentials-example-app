import { useAppDispatch } from "@/store/hooks";
import { Post, reactionAdded, ReactionName } from "./postSlice";

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
};

interface ReactionButtonsProps {
  post: Post;
};

export default function ReactionButtons({ post }: ReactionButtonsProps) {
  const dispatch = useAppDispatch();

  return <div>
    {Object.entries(reactionEmoji).map(([stringName, emoji]) => {
      const reaction = stringName as ReactionName;

      return (
        <button
          key={reaction}
          type='button'
          className="muted-button reaction-button"
          onClick={() => {
            dispatch(reactionAdded({postId: post.id, reaction: reaction }))
          }}
        >
          {emoji} {post.reactions[reaction]}
        </button>
      )
    })}
  </div>
}