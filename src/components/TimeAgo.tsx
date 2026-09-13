import { formatDistanceToNow, parseISO } from "date-fns";

interface TimeAgoProps {
  timestamp: string
}

export default function TimeAgo({ timestamp }: TimeAgoProps) {
  let time = '';

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    time = timePeriod + ' ago';
  }

  return (
    <time dateTime={timestamp} title={timestamp}>&nbsp; <i>{time}</i></time>
  )
}