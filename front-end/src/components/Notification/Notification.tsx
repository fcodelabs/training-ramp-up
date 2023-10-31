interface NotificationProps {
  message: string;
}

export const NotifiactionComponent = ({ message }: NotificationProps) => {
  return (
    <>
      <div>{message}</div>
    </>
  );
};
