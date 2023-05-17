const Chat = ({ descendingOrderMessages }) => {
  return (
    <div className="chat-display">
      {descendingOrderMessages.map((message, index) => (
        <div key={index}>
          <div className="chat-message-header">
            <div className="image-container">
              <img src={message.img} alt={message.first_name + " avatar"} />
            </div>
            <p>{message.name}</p>
          </div>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
