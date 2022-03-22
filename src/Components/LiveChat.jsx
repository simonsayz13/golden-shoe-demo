import React from "react";
import logo from "../Assets/live-chat-icon.png";

const LiveChat = () => {
  return (
    <React.Fragment>
      <div>
        <img
          style={{
            position: "absolute",
            right: 0,
            width: 75,
            height: 75,
          }}
          src={logo}
        />
      </div>
    </React.Fragment>
  );
};

export default LiveChat;
