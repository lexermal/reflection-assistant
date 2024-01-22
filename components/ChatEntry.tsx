export default function ChatEntry(props: { user: boolean; message: string }) {
  return (
    <div
      className={'flex rounded-lg p-3 ' + (props.user ? '' : 'bg-yellow-100')}
    >
      <div className="flex-none pr-5">
        <i
          className={`text-3xl bi bi-${props.user ? 'person' : 'robot'}`}
        ></i>
      </div>
      <div className="flex-auto">
        <div className={'flex items-center h-full '}>
          <p className={props.user ? '' : 'font-semibold'}>{props.message}</p>
        </div>
      </div>
    </div>
  );
}
