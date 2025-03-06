export const notifySessionUpdate = (io:any) => {
    io.emit("updateSessions");
  };
  