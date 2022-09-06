import React, { useState } from "react";

function Reminders(props) {
  const [date, setDate] = useState(new Date(props.r.createdAt));

  return (
    <div className="flex justify-between items-center px-10 py-4 my-2 rounded-lg text-white font-semibold capitalize bg-red-400">
      <div>{props.r.title}</div>
      <div>
        Reminder set at: {date.getDate()}.{date.getMonth() + 1}.
        {date.getFullYear()} {date.getHours()}:{date.getMinutes()}
      </div>
    </div>
  );
}

export default Reminders;
