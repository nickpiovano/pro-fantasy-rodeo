import { api } from './api';

interface PaymentResponse {
  success: boolean;
  message?: string;
  transactionId?: string;
}

interface PaymentDetails {
  amount: number;
  currency: string;
  paymentMethod: string;
  cardNumber?: string;
  expMonth?: string;
  expYear?: string;
  cvc?: string;
}

/**
 * Payment service for handling contest entry fees
 */
export const paymentService = {
  /**
   * Process a payment for contest entry
   */
  async processPayment(paymentDetails: PaymentDetails): Promise<PaymentResponse> {
    try {
      // For MVP, we're simulating a successful payment
      // In a production app, you would integrate with a payment gateway
      
      // Uncomment this for real payment integration:
      // return await api.post<PaymentResponse>('/payments/process', paymentDetails);
      
      // Simple validation
      if (!paymentDetails.amount || paymentDetails.amount !== 19.95) {
        return {
          success: false,
          message: 'Invalid payment amount. Entry fee is $19.95.'
        };
      }
      
      // Simulate successful payment
      return {
        success: true,
        message: 'Payment successful!',
        transactionId: `tx-${Date.now()}`
      };
    } catch (error) {
      console.error('Payment processing failed:', error);
      return {
        success: false,
        message: 'Payment failed. Please try again or use a different payment method.'
      };
    }
  },

  /**
   * Get entry fee amount
   */
  getEntryFee(): number {
    return 19.95;
  }
}; 