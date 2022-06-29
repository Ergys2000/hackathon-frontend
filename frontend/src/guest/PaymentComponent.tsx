import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
  } from "@paypal/react-paypal-js";
  import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
  import { PayPalButtonsComponentOptions } from "@paypal/paypal-js/types/components/buttons";
import Swal from "sweetalert2";

const PaymentComponent = (props: {amount: number}) => {  
      const paypalScriptOptions: PayPalScriptOptions = {
        "client-id":
          "AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
        currency: "USD"
      };
      function Button() {
        /**
         * usePayPalScriptReducer use within PayPalScriptProvider
         * isPending: not finished loading(default state)
         * isResolved: successfully loaded
         * isRejected: failed to load
         */
        const [{ isPending }] = usePayPalScriptReducer();
        const paypalbuttonTransactionProps: PayPalButtonsComponentOptions = {
          style: { layout: "vertical" },
          createOrder(data: any, actions: any) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: props.amount
                  }
                }
              ]
            });
          },
          onApprove(data: any, actions: any) {
            /**
             * data: {
             *   orderID: string;
             *   payerID: string;
             *   paymentID: string | null;
             *   billingToken: string | null;
             *   facilitatorAccesstoken: string;
             * }
             */
            return actions.order.capture({}).then((details: any) => {
              Swal.fire({icon: "success", text: "Payment was successfull, we will send you and email with the receipt!"});
            });
          }
        };
        return (
          <>
            {isPending ? <h2>Load Smart Payment Button...</h2> : null}
            <PayPalButtons {...paypalbuttonTransactionProps} />
          </>
        );
      }
        return (
          <div className="App mx-auto">
            <PayPalScriptProvider options={paypalScriptOptions}>
              <Button />
            </PayPalScriptProvider>
          </div>
        );
    }
export default PaymentComponent;