import { checkToken } from "../../utilities/users-service";

export default function OrderHistoryPage() {
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  }

  return (
    <div>
      <h1>Order History Page</h1>
      <button onClick={handleCheckToken}>Check when my login expires</button>
    </div>
  );
}
