/**
 * Invoice Generator Component
 * Generates and displays order invoices with download functionality
 */

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  Receipt as ReceiptIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEmailNotifications } from '../../hooks/useEmailNotifications';

interface InvoiceItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  size?: string;
  color?: string;
}

interface InvoiceData {
  id: string;
  orderNumber: string;
  orderDate: string;
  dueDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  notes?: string;
}

interface InvoiceGeneratorProps {
  invoiceData: InvoiceData;
  onDownload?: (invoiceId: string) => void;
  onEmail?: (invoiceId: string, email: string) => void;
  onPrint?: (invoiceId: string) => void;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({
  invoiceData,
  onDownload,
  onEmail,
  onPrint,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const [emailAddress, setEmailAddress] = useState(invoiceData.customer.email);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { sendOrderConfirmation, isSending } = useEmailNotifications();

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // TODO: Implement actual PDF generation
      // For now, we'll simulate the download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a blob URL for download
      const invoiceHtml = invoiceRef.current?.innerHTML || '';
      const blob = new Blob([invoiceHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoiceData.orderNumber}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSuccess('Invoice downloaded successfully!');
      onDownload?.(invoiceData.id);
    } catch (err) {
      setError('Failed to download invoice');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmail = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      await sendOrderConfirmation(emailAddress, {
        orderNumber: invoiceData.orderNumber,
        customerName: invoiceData.customer.name,
        total: invoiceData.total,
        items: invoiceData.items,
        shippingAddress: invoiceData.customer.address,
      });
      
      setSuccess('Invoice sent successfully!');
      setEmailDialog(false);
      onEmail?.(invoiceData.id, emailAddress);
    } catch (err) {
      setError('Failed to send invoice');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => {
      window.print();
      onPrint?.(invoiceData.id);
    }, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#00ff88';
      case 'pending': return '#ffaa00';
      case 'overdue': return '#ff4444';
      default: return '#cccccc';
    }
  };

  const InvoiceContent = () => (
    <Box
      ref={invoiceRef}
      sx={{
        background: 'white',
        color: 'black',
        p: 4,
        minHeight: '100vh',
        '@media print': {
          p: 2,
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            INVOICE
          </Typography>
          <Typography variant="h6" sx={{ color: '#666' }}>
            AllBlackery
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Premium Black Fashion
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            #{invoiceData.orderNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
            Order Date: {new Date(invoiceData.orderDate).toLocaleDateString()}
          </Typography>
          {invoiceData.dueDate && (
            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
              Due Date: {new Date(invoiceData.dueDate).toLocaleDateString()}
            </Typography>
          )}
          <Box
            sx={{
              display: 'inline-block',
              px: 2,
              py: 1,
              borderRadius: 1,
              backgroundColor: getStatusColor(invoiceData.status),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            {invoiceData.status.toUpperCase()}
          </Box>
        </Box>
      </Box>

      {/* Customer Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Bill To:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          {invoiceData.customer.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
          {invoiceData.customer.email}
        </Typography>
        {invoiceData.customer.phone && (
          <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
            {invoiceData.customer.phone}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
          {invoiceData.customer.address.street}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          {invoiceData.customer.address.city}, {invoiceData.customer.address.state} {invoiceData.customer.address.zipCode}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          {invoiceData.customer.address.country}
        </Typography>
      </Box>

      {/* Items Table */}
      <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 'none', border: '1px solid #eee' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {item.productName}
                  </Typography>
                  {(item.size || item.color) && (
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {item.size && `Size: ${item.size}`}
                      {item.size && item.color && ' • '}
                      {item.color && `Color: ${item.color}`}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>${item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Totals */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Box sx={{ width: 300 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1">${invoiceData.subtotal.toFixed(2)}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Shipping:</Typography>
            <Typography variant="body1">
              {invoiceData.shipping === 0 ? 'Free' : `$${invoiceData.shipping.toFixed(2)}`}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Tax:</Typography>
            <Typography variant="body1">${invoiceData.tax.toFixed(2)}</Typography>
          </Box>
          
          {invoiceData.discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" sx={{ color: '#00aa00' }}>Discount:</Typography>
              <Typography variant="body1" sx={{ color: '#00aa00' }}>
                -${invoiceData.discount.toFixed(2)}
              </Typography>
            </Box>
          )}
          
          <Divider sx={{ my: 1 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              ${invoiceData.total.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Payment Method */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          Payment Method:
        </Typography>
        <Typography variant="body1" sx={{ color: '#666' }}>
          {invoiceData.paymentMethod}
        </Typography>
      </Box>

      {/* Notes */}
      {invoiceData.notes && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            Notes:
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            {invoiceData.notes}
          </Typography>
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 4, pt: 4, borderTop: '1px solid #eee' }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Thank you for your business!
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          For questions about this invoice, contact us at support@allblackery.com
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box>
      {/* Action Buttons */}
      <Card sx={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        mb: 3,
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ReceiptIcon sx={{ color: '#00ff88', fontSize: 30 }} />
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                Invoice #{invoiceData.orderNumber}
              </Typography>
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1,
                backgroundColor: getStatusColor(invoiceData.status),
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
              }}
            >
              {invoiceData.status.toUpperCase()}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={isGenerating ? <CircularProgress size={20} /> : <DownloadIcon />}
              onClick={handleDownload}
              disabled={isGenerating}
              sx={{
                background: 'linear-gradient(45deg, #00ff88 30%, #00cc66 90%)',
                color: 'black',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66 30%, #00ff88 90%)',
                },
              }}
            >
              Download PDF
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Print
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              onClick={() => setEmailDialog(true)}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Email
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => setShowPreview(true)}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Preview
            </Button>
          </Box>

          {/* Success/Error Messages */}
          {success && (
            <Alert
              severity="success"
              sx={{ mt: 2 }}
              action={
                <IconButton size="small" onClick={() => setSuccess(null)}>
                  <CheckIcon />
                </IconButton>
              }
            >
              {success}
            </Alert>
          )}
          
          {error && (
            <Alert
              severity="error"
              sx={{ mt: 2 }}
              action={
                <IconButton size="small" onClick={() => setError(null)}>
                  <CloseIcon />
                </IconButton>
              }
            >
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Invoice Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            backgroundColor: 'white',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Invoice Preview</Typography>
          <IconButton onClick={() => setShowPreview(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ height: '70vh', overflow: 'auto' }}>
            <InvoiceContent />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog
        open={emailDialog}
        onClose={() => setEmailDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Send Invoice via Email</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Send invoice #{invoiceData.orderNumber} to:
            </Typography>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Email address"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px',
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialog(false)}>Cancel</Button>
          <Button
            onClick={handleEmail}
            disabled={isSending || !emailAddress}
            startIcon={isSending ? <CircularProgress size={20} /> : <EmailIcon />}
            variant="contained"
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvoiceGenerator;