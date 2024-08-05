export default function CountDownDisplay({ countdown }) {
  let minutes = `${Math.floor(countdown / 60)}`;
  if (minutes.length === 1) minutes = `0${minutes}`;
  const seconds = `${countdown % 60}`.padStart(2, "0");

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
}
