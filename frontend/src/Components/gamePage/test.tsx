import React from "react";
import NotificationProvider, { useNotification } from "use-toast-notification";

const App = () => {
  const notification = useNotification();

  const handleSubmit = async (e: any) => {
    try {
      notification.show({
        message: "Your delivery is on its way",
        title: "Delivery Status",
        variant: "success",
      });
    } catch (e) {
      notification.show({
        message: "Your delivery could not be processed",
        title: "Delivery Status",
        variant: "error",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="address" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const Main = () => {
  return (
    <NotificationProvider
      config={{
        position: "top-right",
        isCloseable: false,
        showTitle: true,
        showIcon: true,
        duration: 5,
      }}
    >
      <App />
    </NotificationProvider>
  );
};

export default Main;
