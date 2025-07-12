"""
AllBlackery Backend - Premium Black Fashion E-commerce Platform

This is a comprehensive FastAPI backend providing:
- User authentication with JWT and Google OAuth (Mock)
- Product management with advanced filtering and suggestions
- Shopping cart and wishlist functionality with CRUD operations
- Order processing with Stripe integration (Mock)
- Email notifications and OTP verification (Mock)
- Invoice generation with PDF support
- Admin panel capabilities
- Advanced search and recommendation engine

Note: This implementation uses MOCK services for development.
To use real integrations, replace mock functions with actual API calls.

Third-party Integration Setup:
1. Google OAuth:
   - Go to Google Cloud Console: https://console.cloud.google.com/
   - Create new project or select existing
   - Enable Google+ API and Google OAuth2 API
   - Create OAuth 2.0 Client ID credentials
   - Set authorized redirect URIs: http://localhost:5173/auth/google/callback

2. Stripe Payment:
   - Sign up at https://stripe.com/
   - Get API keys from Dashboard > Developers > API keys
   - Set up webhooks for payment events: http://localhost:8001/api/payments/webhook

3. Email Service (SendGrid recommended):
   - Sign up at https://sendgrid.com/
   - Get API key from Settings > API Keys
   - Verify sender email address

4. OTP Service (Twilio recommended):
   - Sign up at https://twilio.com/
   - Get Account SID and Auth Token from Console
   - Get phone number for SMS sending

5. MongoDB:
   - Use MongoDB Atlas: https://www.mongodb.com/cloud/atlas
   - Configure connection string in MONGO_URL

Tech Stack: FastAPI + MongoDB + JWT + Stripe + SendGrid + Twilio
"""

from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import json
import uuid
import random
import string
import hashlib
import base64
from datetime import datetime, timedelta
from io import BytesIO
import os

# Mock imports - replace with actual imports when using real services
# from google.oauth2 import id_token
# from google.auth.transport import requests as google_requests
# import stripe
# from twilio.rest import Client as TwilioClient
# from sendgrid import SendGridAPIClient
# from sendgrid.helpers.mail import Mail
# from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import letter

# Create FastAPI app
app = FastAPI(
    title="AllBlackery API",
    description="Premium Black Fashion E-commerce Platform API",
    version="2.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Mock data storage (replace with MongoDB in production)
users_db = {}
products_db = {}
categories_db = {}
carts_db = {}
wishlists_db = {}
orders_db = {}
otps_db = {}
sessions_db = {}

# Initialize mock data
def initialize_mock_data():
    """Initialize mock products and categories"""
    global products_db, categories_db
    
    # Mock categories
    categories_db = {
        "jackets": {
            "id": "jackets",
            "name": "Jackets",
            "description": "Premium black leather and fabric jackets",
            "image": "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400",
            "productCount": 25
        },
        "dresses": {
            "id": "dresses",
            "name": "Dresses",
            "description": "Elegant black dresses for every occasion",
            "image": "https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=400",
            "productCount": 18
        },
        "bags": {
            "id": "bags",
            "name": "Bags",
            "description": "Luxury handbags and accessories",
            "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
            "productCount": 12
        },
        "shoes": {
            "id": "shoes",
            "name": "Shoes",
            "description": "Designer black footwear",
            "image": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400",
            "productCount": 22
        },
        "accessories": {
            "id": "accessories",
            "name": "Accessories",
            "description": "Premium black accessories",
            "image": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
            "productCount": 15
        }
    }
    
    # Mock products
    products_db = {
        "1": {
            "id": "1",
            "name": "Premium Black Leather Jacket",
            "description": "Luxurious black leather jacket with premium finish. Crafted from genuine leather with attention to detail.",
            "price": 299.99,
            "originalPrice": 399.99,
            "discount": 25,
            "categoryId": "jackets",
            "images": [
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
                "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800",
                "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"
            ],
            "sizes": ["S", "M", "L", "XL", "XXL"],
            "colors": ["Black", "Brown"],
            "stock": 15,
            "featured": True,
            "rating": 4.8,
            "reviews": 127,
            "brand": "AllBlackery",
            "materials": ["Genuine Leather", "Cotton Lining"],
            "careInstructions": "Professional cleaning recommended",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        },
        "2": {
            "id": "2",
            "name": "Elegant Black Dress",
            "description": "Stunning black dress for special occasions. Perfect for evening events and formal gatherings.",
            "price": 189.99,
            "originalPrice": 249.99,
            "discount": 24,
            "categoryId": "dresses",
            "images": [
                "https://images.unsplash.com/photo-1566479179817-6b8e3b00e8b4?w=800",
                "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800"
            ],
            "sizes": ["XS", "S", "M", "L", "XL"],
            "colors": ["Black", "Navy"],
            "stock": 8,
            "featured": True,
            "rating": 4.9,
            "reviews": 89,
            "brand": "AllBlackery",
            "materials": ["Polyester", "Spandex"],
            "careInstructions": "Machine wash cold, hang dry",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        },
        "3": {
            "id": "3",
            "name": "Luxury Black Handbag",
            "description": "Premium leather handbag with gold accents. Spacious interior with multiple compartments.",
            "price": 249.99,
            "originalPrice": 329.99,
            "discount": 24,
            "categoryId": "bags",
            "images": [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
            ],
            "sizes": ["One Size"],
            "colors": ["Black", "Gold"],
            "stock": 12,
            "featured": True,
            "rating": 4.9,
            "reviews": 234,
            "brand": "AllBlackery",
            "materials": ["Genuine Leather", "Gold Hardware"],
            "careInstructions": "Wipe with dry cloth",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        },
        "4": {
            "id": "4",
            "name": "Designer Black Boots",
            "description": "Stylish black boots with premium construction. Perfect for both casual and formal wear.",
            "price": 199.99,
            "originalPrice": 279.99,
            "discount": 29,
            "categoryId": "shoes",
            "images": [
                "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800",
                "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
            ],
            "sizes": ["6", "7", "8", "9", "10", "11", "12"],
            "colors": ["Black", "Dark Brown"],
            "stock": 20,
            "featured": False,
            "rating": 4.7,
            "reviews": 156,
            "brand": "AllBlackery",
            "materials": ["Leather", "Rubber Sole"],
            "careInstructions": "Clean with leather conditioner",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        },
        "5": {
            "id": "5",
            "name": "Black Statement Necklace",
            "description": "Bold black statement necklace with geometric design. Perfect for evening wear.",
            "price": 79.99,
            "originalPrice": 99.99,
            "discount": 20,
            "categoryId": "accessories",
            "images": [
                "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800",
                "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800"
            ],
            "sizes": ["One Size"],
            "colors": ["Black", "Silver"],
            "stock": 25,
            "featured": False,
            "rating": 4.6,
            "reviews": 78,
            "brand": "AllBlackery",
            "materials": ["Alloy", "Black Coating"],
            "careInstructions": "Avoid water contact",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
    }

# Initialize data
initialize_mock_data()

# Pydantic Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

class UserRegister(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleAuth(BaseModel):
    token: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    email: EmailStr
    otp: str
    newPassword: str

class VerifyOTP(BaseModel):
    email: EmailStr
    otp: str

class CartItem(BaseModel):
    productId: str
    quantity: int
    size: Optional[str] = None
    color: Optional[str] = None

class WishlistItem(BaseModel):
    productId: str

class CreateOrder(BaseModel):
    items: List[CartItem]
    shippingAddress: Dict[str, Any]
    paymentMethod: str
    paymentIntentId: Optional[str] = None

# Mock helper functions
def generate_jwt_token(user_id: str) -> str:
    """Mock JWT token generation"""
    return f"mock_jwt_token_{user_id}_{random.randint(1000, 9999)}"

def generate_otp() -> str:
    """Generate 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))

def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return hash_password(password) == hashed

def mock_send_email(to_email: str, subject: str, content: str):
    """Mock email sending function"""
    print(f"📧 MOCK EMAIL SENT")
    print(f"To: {to_email}")
    print(f"Subject: {subject}")
    print(f"Content: {content}")
    print("=" * 50)
    # TODO: Replace with actual SendGrid implementation
    # sg = SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
    # message = Mail(from_email='noreply@allblackery.com', to_emails=to_email, subject=subject, html_content=content)
    # response = sg.send(message)

def mock_send_sms(phone: str, message: str):
    """Mock SMS sending function"""
    print(f"📱 MOCK SMS SENT")
    print(f"To: {phone}")
    print(f"Message: {message}")
    print("=" * 50)
    # TODO: Replace with actual Twilio implementation
    # client = TwilioClient(os.environ.get('TWILIO_ACCOUNT_SID'), os.environ.get('TWILIO_AUTH_TOKEN'))
    # message = client.messages.create(body=message, from_='+1234567890', to=phone)

def mock_google_verify_token(token: str) -> Dict[str, Any]:
    """Mock Google token verification"""
    print(f"🔐 MOCK GOOGLE TOKEN VERIFICATION")
    print(f"Token: {token}")
    # TODO: Replace with actual Google OAuth verification
    # idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), os.environ.get('GOOGLE_CLIENT_ID'))
    return {
        "sub": "mock_google_user_id",
        "email": "user@gmail.com",
        "name": "John Doe",
        "picture": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    }

def mock_stripe_create_payment_intent(amount: int, currency: str = "usd") -> Dict[str, Any]:
    """Mock Stripe payment intent creation"""
    print(f"💳 MOCK STRIPE PAYMENT INTENT")
    print(f"Amount: ${amount/100}")
    print(f"Currency: {currency}")
    # TODO: Replace with actual Stripe implementation
    # stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
    # intent = stripe.PaymentIntent.create(amount=amount, currency=currency)
    return {
        "id": f"pi_mock_{random.randint(10000, 99999)}",
        "client_secret": f"pi_mock_{random.randint(10000, 99999)}_secret",
        "amount": amount,
        "currency": currency,
        "status": "requires_payment_method"
    }

def mock_generate_invoice_pdf(order_data: Dict[str, Any]) -> bytes:
    """Mock PDF invoice generation"""
    print(f"📄 MOCK PDF INVOICE GENERATION")
    print(f"Order ID: {order_data.get('id')}")
    # TODO: Replace with actual PDF generation using reportlab
    # buffer = BytesIO()
    # p = canvas.Canvas(buffer, pagesize=letter)
    # p.drawString(100, 750, f"Invoice for Order {order_data['id']}")
    # p.save()
    # return buffer.getvalue()
    return b"Mock PDF Invoice Content"

def get_product_suggestions(product_ids: List[str]) -> List[Dict[str, Any]]:
    """Generate product suggestions based on cart/wishlist items"""
    suggestions = []
    for product_id in product_ids:
        if product_id in products_db:
            product = products_db[product_id]
            category_id = product['categoryId']
            
            # Find similar products in same category
            similar_products = [
                p for p in products_db.values() 
                if p['categoryId'] == category_id and p['id'] != product_id
            ]
            
            suggestions.extend(similar_products[:2])  # Add 2 suggestions per product
    
    return suggestions[:5]  # Return top 5 suggestions

# Authentication dependency
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current authenticated user"""
    token = credentials.credentials
    # Mock user verification
    if token.startswith("mock_jwt_token_"):
        user_id = token.split("_")[3]
        if user_id in users_db:
            return users_db[user_id]
    raise HTTPException(status_code=401, detail="Invalid token")

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "AllBlackery API - Premium Black Fashion E-commerce Platform",
        "version": "2.0.0",
        "status": "running",
        "features": [
            "Google OAuth Authentication",
            "Stripe Payment Processing",
            "Email Notifications",
            "OTP Verification",
            "Product Recommendations",
            "PDF Invoice Generation",
            "Advanced Search & Filtering"
        ],
        "endpoints": {
            "auth": "/api/auth",
            "products": "/api/products",
            "cart": "/api/cart",
            "wishlist": "/api/wishlist",
            "orders": "/api/orders",
            "payments": "/api/payments",
            "categories": "/api/categories"
        }
    }

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Authentication Endpoints
@app.post("/api/auth/register")
async def register(user_data: UserRegister):
    """Register new user with OTP verification"""
    try:
        # Check if user exists
        if any(u['email'] == user_data.email for u in users_db.values()):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Generate user ID and OTP
        user_id = str(uuid.uuid4())
        otp = generate_otp()
        
        # Store user (unverified)
        users_db[user_id] = {
            "id": user_id,
            "firstName": user_data.firstName,
            "lastName": user_data.lastName,
            "email": user_data.email,
            "password": hash_password(user_data.password),
            "phone": user_data.phone,
            "isVerified": False,
            "role": "user",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
        
        # Store OTP
        otps_db[user_data.email] = {
            "otp": otp,
            "expires": (datetime.now() + timedelta(minutes=10)).isoformat(),
            "type": "registration"
        }
        
        # Send OTP email
        email_content = f"""
        <h2>Welcome to AllBlackery!</h2>
        <p>Your verification code is: <strong>{otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>Enter this code to complete your registration.</p>
        """
        mock_send_email(user_data.email, "Verify Your AllBlackery Account", email_content)
        
        return {
            "success": True,
            "message": "Registration successful! Please check your email for verification code.",
            "data": {"userId": user_id, "email": user_data.email}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@app.post("/api/auth/verify-otp")
async def verify_otp(otp_data: VerifyOTP):
    """Verify OTP for registration or password reset"""
    try:
        email = otp_data.email
        otp = otp_data.otp
        
        # Check if OTP exists
        if email not in otps_db:
            raise HTTPException(status_code=400, detail="OTP not found")
        
        stored_otp = otps_db[email]
        
        # Check if OTP is expired
        if datetime.now() > datetime.fromisoformat(stored_otp['expires']):
            del otps_db[email]
            raise HTTPException(status_code=400, detail="OTP expired")
        
        # Verify OTP
        if stored_otp['otp'] != otp:
            raise HTTPException(status_code=400, detail="Invalid OTP")
        
        # Mark user as verified if registration OTP
        if stored_otp['type'] == 'registration':
            for user in users_db.values():
                if user['email'] == email:
                    user['isVerified'] = True
                    user['updatedAt'] = datetime.now().isoformat()
                    break
        
        # Clean up OTP
        del otps_db[email]
        
        return {
            "success": True,
            "message": "OTP verified successfully",
            "data": {"email": email}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OTP verification failed: {str(e)}")

@app.post("/api/auth/login")
async def login(login_data: UserLogin):
    """Login user with email and password"""
    try:
        # Find user
        user = None
        for u in users_db.values():
            if u['email'] == login_data.email:
                user = u
                break
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Verify password
        if not verify_password(login_data.password, user['password']):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Check if user is verified
        if not user['isVerified']:
            raise HTTPException(status_code=401, detail="Please verify your email first")
        
        # Generate token
        token = generate_jwt_token(user['id'])
        
        # Send login notification email
        email_content = f"""
        <h2>Login Notification</h2>
        <p>Hello {user['firstName']},</p>
        <p>You have successfully logged into your AllBlackery account.</p>
        <p>Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        <p>If this wasn't you, please contact support immediately.</p>
        """
        mock_send_email(user['email'], "Login Notification - AllBlackery", email_content)
        
        return {
            "success": True,
            "message": "Login successful",
            "data": {
                "user": {
                    "id": user['id'],
                    "email": user['email'],
                    "firstName": user['firstName'],
                    "lastName": user['lastName'],
                    "role": user['role'],
                    "isVerified": user['isVerified']
                },
                "accessToken": token,
                "tokenType": "bearer"
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

@app.post("/api/auth/google")
async def google_auth(auth_data: GoogleAuth):
    """Google OAuth authentication"""
    try:
        # Verify Google token
        user_info = mock_google_verify_token(auth_data.token)
        
        # Check if user exists
        user = None
        for u in users_db.values():
            if u['email'] == user_info['email']:
                user = u
                break
        
        # Create user if doesn't exist
        if not user:
            user_id = str(uuid.uuid4())
            user = {
                "id": user_id,
                "firstName": user_info['name'].split()[0],
                "lastName": user_info['name'].split()[-1] if len(user_info['name'].split()) > 1 else "",
                "email": user_info['email'],
                "password": "",  # No password for Google users
                "phone": None,
                "isVerified": True,  # Google users are pre-verified
                "role": "user",
                "googleId": user_info['sub'],
                "picture": user_info.get('picture'),
                "createdAt": datetime.now().isoformat(),
                "updatedAt": datetime.now().isoformat()
            }
            users_db[user_id] = user
        
        # Generate token
        token = generate_jwt_token(user['id'])
        
        return {
            "success": True,
            "message": "Google authentication successful",
            "data": {
                "user": {
                    "id": user['id'],
                    "email": user['email'],
                    "firstName": user['firstName'],
                    "lastName": user['lastName'],
                    "role": user['role'],
                    "isVerified": user['isVerified'],
                    "picture": user.get('picture')
                },
                "accessToken": token,
                "tokenType": "bearer"
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Google authentication failed: {str(e)}")

@app.post("/api/auth/forgot-password")
async def forgot_password(forgot_data: ForgotPassword):
    """Send OTP for password reset"""
    try:
        # Find user
        user = None
        for u in users_db.values():
            if u['email'] == forgot_data.email:
                user = u
                break
        
        if not user:
            # Don't reveal if email exists or not
            return {
                "success": True,
                "message": "If the email exists, you will receive a reset code.",
                "data": None
            }
        
        # Generate OTP
        otp = generate_otp()
        
        # Store OTP
        otps_db[forgot_data.email] = {
            "otp": otp,
            "expires": (datetime.now() + timedelta(minutes=10)).isoformat(),
            "type": "password_reset"
        }
        
        # Send OTP email
        email_content = f"""
        <h2>Password Reset Request</h2>
        <p>Hello {user['firstName']},</p>
        <p>You requested to reset your AllBlackery account password.</p>
        <p>Your reset code is: <strong>{otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        """
        mock_send_email(forgot_data.email, "Password Reset - AllBlackery", email_content)
        
        return {
            "success": True,
            "message": "If the email exists, you will receive a reset code.",
            "data": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Password reset failed: {str(e)}")

@app.post("/api/auth/reset-password")
async def reset_password(reset_data: ResetPassword):
    """Reset password using OTP"""
    try:
        email = reset_data.email
        otp = reset_data.otp
        
        # Check if OTP exists
        if email not in otps_db:
            raise HTTPException(status_code=400, detail="Invalid or expired reset code")
        
        stored_otp = otps_db[email]
        
        # Check if OTP is expired
        if datetime.now() > datetime.fromisoformat(stored_otp['expires']):
            del otps_db[email]
            raise HTTPException(status_code=400, detail="Reset code expired")
        
        # Verify OTP
        if stored_otp['otp'] != otp or stored_otp['type'] != 'password_reset':
            raise HTTPException(status_code=400, detail="Invalid reset code")
        
        # Find and update user password
        user = None
        for u in users_db.values():
            if u['email'] == email:
                user = u
                break
        
        if not user:
            raise HTTPException(status_code=400, detail="User not found")
        
        # Update password
        user['password'] = hash_password(reset_data.newPassword)
        user['updatedAt'] = datetime.now().isoformat()
        
        # Clean up OTP
        del otps_db[email]
        
        # Send confirmation email
        email_content = f"""
        <h2>Password Reset Successful</h2>
        <p>Hello {user['firstName']},</p>
        <p>Your AllBlackery account password has been successfully reset.</p>
        <p>Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        <p>If you didn't make this change, please contact support immediately.</p>
        """
        mock_send_email(email, "Password Reset Confirmation - AllBlackery", email_content)
        
        return {
            "success": True,
            "message": "Password reset successful",
            "data": None
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Password reset failed: {str(e)}")

# Products API with advanced features
@app.get("/api/products")
async def get_products(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = "newest",  # newest, price_low, price_high, rating
    page: int = 1,
    limit: int = 20
):
    """Get products with advanced filtering and sorting"""
    try:
        filtered_products = list(products_db.values())
        
        # Apply filters
        if category:
            filtered_products = [p for p in filtered_products if p["categoryId"] == category]
        
        if featured is not None:
            filtered_products = [p for p in filtered_products if p["featured"] == featured]
        
        if search:
            search_lower = search.lower()
            filtered_products = [
                p for p in filtered_products 
                if (search_lower in p["name"].lower() or 
                    search_lower in p["description"].lower() or
                    search_lower in p["brand"].lower())
            ]
        
        if min_price is not None:
            filtered_products = [p for p in filtered_products if p["price"] >= min_price]
        
        if max_price is not None:
            filtered_products = [p for p in filtered_products if p["price"] <= max_price]
        
        # Apply sorting
        if sort_by == "price_low":
            filtered_products.sort(key=lambda x: x["price"])
        elif sort_by == "price_high":
            filtered_products.sort(key=lambda x: x["price"], reverse=True)
        elif sort_by == "rating":
            filtered_products.sort(key=lambda x: x["rating"], reverse=True)
        elif sort_by == "newest":
            filtered_products.sort(key=lambda x: x["createdAt"], reverse=True)
        
        # Pagination
        start_index = (page - 1) * limit
        end_index = start_index + limit
        paginated_products = filtered_products[start_index:end_index]
        
        return {
            "success": True,
            "message": "Products retrieved successfully",
            "data": {
                "products": paginated_products,
                "pagination": {
                    "page": page,
                    "limit": limit,
                    "total": len(filtered_products),
                    "pages": (len(filtered_products) + limit - 1) // limit
                },
                "filters": {
                    "categories": list(categories_db.keys()),
                    "priceRange": {
                        "min": min([p["price"] for p in products_db.values()]),
                        "max": max([p["price"] for p in products_db.values()])
                    }
                }
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve products: {str(e)}")

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    """Get single product by ID with recommendations"""
    try:
        if product_id not in products_db:
            raise HTTPException(status_code=404, detail="Product not found")
        
        product = products_db[product_id]
        
        # Get related products
        related_products = [
            p for p in products_db.values() 
            if p["categoryId"] == product["categoryId"] and p["id"] != product_id
        ][:4]  # Get 4 related products
        
        return {
            "success": True,
            "message": "Product retrieved successfully",
            "data": {
                "product": product,
                "relatedProducts": related_products
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve product: {str(e)}")

@app.get("/api/products/suggestions/{product_id}")
async def get_product_suggestions_endpoint(product_id: str):
    """Get product suggestions based on a specific product"""
    try:
        if product_id not in products_db:
            raise HTTPException(status_code=404, detail="Product not found")
        
        suggestions = get_product_suggestions([product_id])
        
        return {
            "success": True,
            "message": "Product suggestions retrieved successfully",
            "data": {"suggestions": suggestions}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get suggestions: {str(e)}")

# Categories API
@app.get("/api/categories")
async def get_categories():
    """Get all categories with product counts"""
    try:
        return {
            "success": True,
            "message": "Categories retrieved successfully",
            "data": {"categories": list(categories_db.values())}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve categories: {str(e)}")

# Cart API with CRUD operations
@app.get("/api/cart")
async def get_cart(current_user: dict = Depends(get_current_user)):
    """Get user's cart"""
    try:
        user_id = current_user['id']
        cart = carts_db.get(user_id, {
            "id": str(uuid.uuid4()),
            "userId": user_id,
            "items": [],
            "totalAmount": 0,
            "totalItems": 0,
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        })
        
        # Calculate totals
        total_amount = 0
        total_items = 0
        for item in cart["items"]:
            if item["productId"] in products_db:
                product = products_db[item["productId"]]
                total_amount += product["price"] * item["quantity"]
                total_items += item["quantity"]
        
        cart["totalAmount"] = total_amount
        cart["totalItems"] = total_items
        
        # Get product suggestions
        product_ids = [item["productId"] for item in cart["items"]]
        suggestions = get_product_suggestions(product_ids) if product_ids else []
        
        return {
            "success": True,
            "message": "Cart retrieved successfully",
            "data": {
                "cart": cart,
                "suggestions": suggestions
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve cart: {str(e)}")

@app.post("/api/cart/add")
async def add_to_cart(item_data: CartItem, current_user: dict = Depends(get_current_user)):
    """Add item to cart"""
    try:
        user_id = current_user['id']
        
        # Validate product exists
        if item_data.productId not in products_db:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Get or create cart
        if user_id not in carts_db:
            carts_db[user_id] = {
                "id": str(uuid.uuid4()),
                "userId": user_id,
                "items": [],
                "totalAmount": 0,
                "totalItems": 0,
                "createdAt": datetime.now().isoformat(),
                "updatedAt": datetime.now().isoformat()
            }
        
        cart = carts_db[user_id]
        
        # Check if item already exists
        existing_item = None
        for item in cart["items"]:
            if (item["productId"] == item_data.productId and 
                item.get("size") == item_data.size and 
                item.get("color") == item_data.color):
                existing_item = item
                break
        
        if existing_item:
            existing_item["quantity"] += item_data.quantity
        else:
            cart["items"].append({
                "id": str(uuid.uuid4()),
                "productId": item_data.productId,
                "quantity": item_data.quantity,
                "size": item_data.size,
                "color": item_data.color,
                "addedAt": datetime.now().isoformat()
            })
        
        cart["updatedAt"] = datetime.now().isoformat()
        
        return {
            "success": True,
            "message": "Item added to cart successfully",
            "data": {"cartId": cart["id"], "itemId": item_data.productId}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add to cart: {str(e)}")

@app.put("/api/cart/update/{item_id}")
async def update_cart_item(item_id: str, quantity: int, current_user: dict = Depends(get_current_user)):
    """Update cart item quantity"""
    try:
        user_id = current_user['id']
        
        if user_id not in carts_db:
            raise HTTPException(status_code=404, detail="Cart not found")
        
        cart = carts_db[user_id]
        
        # Find and update item
        item_found = False
        for item in cart["items"]:
            if item["id"] == item_id:
                if quantity <= 0:
                    cart["items"].remove(item)
                else:
                    item["quantity"] = quantity
                item_found = True
                break
        
        if not item_found:
            raise HTTPException(status_code=404, detail="Item not found in cart")
        
        cart["updatedAt"] = datetime.now().isoformat()
        
        return {
            "success": True,
            "message": "Cart updated successfully",
            "data": {"cartId": cart["id"]}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update cart: {str(e)}")

@app.delete("/api/cart/remove/{item_id}")
async def remove_from_cart(item_id: str, current_user: dict = Depends(get_current_user)):
    """Remove item from cart"""
    try:
        user_id = current_user['id']
        
        if user_id not in carts_db:
            raise HTTPException(status_code=404, detail="Cart not found")
        
        cart = carts_db[user_id]
        
        # Find and remove item
        item_found = False
        for item in cart["items"]:
            if item["id"] == item_id:
                cart["items"].remove(item)
                item_found = True
                break
        
        if not item_found:
            raise HTTPException(status_code=404, detail="Item not found in cart")
        
        cart["updatedAt"] = datetime.now().isoformat()
        
        return {
            "success": True,
            "message": "Item removed from cart successfully",
            "data": {"cartId": cart["id"]}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove from cart: {str(e)}")

@app.delete("/api/cart/clear")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    """Clear all items from cart"""
    try:
        user_id = current_user['id']
        
        if user_id not in carts_db:
            raise HTTPException(status_code=404, detail="Cart not found")
        
        cart = carts_db[user_id]
        cart["items"] = []
        cart["updatedAt"] = datetime.now().isoformat()
        
        return {
            "success": True,
            "message": "Cart cleared successfully",
            "data": {"cartId": cart["id"]}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to clear cart: {str(e)}")

# Wishlist API with CRUD operations
@app.get("/api/wishlist")
async def get_wishlist(current_user: dict = Depends(get_current_user)):
    """Get user's wishlist"""
    try:
        user_id = current_user['id']
        wishlist = wishlists_db.get(user_id, {
            "id": str(uuid.uuid4()),
            "userId": user_id,
            "items": [],
            "totalItems": 0,
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        })
        
        # Get product suggestions
        product_ids = [item["productId"] for item in wishlist["items"]]
        suggestions = get_product_suggestions(product_ids) if product_ids else []
        
        return {
            "success": True,
            "message": "Wishlist retrieved successfully",
            "data": {
                "wishlist": wishlist,
                "suggestions": suggestions
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve wishlist: {str(e)}")

@app.post("/api/wishlist/add")
async def add_to_wishlist(item_data: WishlistItem, current_user: dict = Depends(get_current_user)):
    """Add item to wishlist"""
    try:
        user_id = current_user['id']
        
        # Validate product exists
        if item_data.productId not in products_db:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Get or create wishlist
        if user_id not in wishlists_db:
            wishlists_db[user_id] = {
                "id": str(uuid.uuid4()),
                "userId": user_id,
                "items": [],
                "totalItems": 0,
                "createdAt": datetime.now().isoformat(),
                "updatedAt": datetime.now().isoformat()
            }
        
        wishlist = wishlists_db[user_id]
        
        # Check if item already exists
        existing_item = any(item["productId"] == item_data.productId for item in wishlist["items"])
        
        if existing_item:
            return {
                "success": True,
                "message": "Item already in wishlist",
                "data": {"wishlistId": wishlist["id"], "itemId": item_data.productId}
            }
        
        wishlist["items"].append({
            "id": str(uuid.uuid4()),
            "productId": item_data.productId,
            "addedAt": datetime.now().isoformat()
        })
        
        wishlist["totalItems"] = len(wishlist["items"])
        wishlist["updatedAt"] = datetime.now().isoformat()
        
        return {
            "success": True,
            "message": "Item added to wishlist successfully",
            "data": {"wishlistId": wishlist["id"], "itemId": item_data.productId}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add to wishlist: {str(e)}")

@app.delete("/api/wishlist/remove/{item_id}")
async def remove_from_wishlist(item_id: str, current_user: dict = Depends(get_current_user)):
    """Remove item from wishlist"""
    try:
        user_id = current_user['id']
        
        if user_id not in wishlists_db:
            raise HTTPException(status_code=404, detail="Wishlist not found")
        
        wishlist = wishlists_db[user_id]
        
        # Find and remove item
        item_found = False
        for item in wishlist["items"]:
            if item["id"] == item_id:
                wishlist["items"].remove(item)
                item_found = True
                break
        
        if not item_found:
            raise HTTPException(status_code=404, detail="Item not found in wishlist")
        
        wishlist["totalItems"] = len(wishlist["items"])
        wishlist["updatedAt"] = datetime.now().isoformat()
        
        return {
            "success": True,
            "message": "Item removed from wishlist successfully",
            "data": {"wishlistId": wishlist["id"]}
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove from wishlist: {str(e)}")

# Orders API with invoice generation
@app.get("/api/orders")
async def get_orders(current_user: dict = Depends(get_current_user)):
    """Get user's order history"""
    try:
        user_id = current_user['id']
        user_orders = [order for order in orders_db.values() if order["userId"] == user_id]
        
        return {
            "success": True,
            "message": "Orders retrieved successfully",
            "data": {
                "orders": user_orders,
                "pagination": {
                    "page": 1,
                    "limit": 20,
                    "total": len(user_orders),
                    "pages": 1
                }
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve orders: {str(e)}")

@app.post("/api/orders")
async def create_order(order_data: CreateOrder, current_user: dict = Depends(get_current_user)):
    """Create new order"""
    try:
        user_id = current_user['id']
        order_id = str(uuid.uuid4())
        
        # Calculate total amount
        total_amount = 0
        order_items = []
        
        for item in order_data.items:
            if item.productId in products_db:
                product = products_db[item.productId]
                item_total = product["price"] * item.quantity
                total_amount += item_total
                
                order_items.append({
                    "productId": item.productId,
                    "productName": product["name"],
                    "productPrice": product["price"],
                    "quantity": item.quantity,
                    "size": item.size,
                    "color": item.color,
                    "itemTotal": item_total
                })
        
        # Create order
        order = {
            "id": order_id,
            "userId": user_id,
            "orderNumber": f"AB{random.randint(100000, 999999)}",
            "items": order_items,
            "totalAmount": total_amount,
            "shippingAddress": order_data.shippingAddress,
            "paymentMethod": order_data.paymentMethod,
            "paymentIntentId": order_data.paymentIntentId,
            "status": "pending",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
        
        orders_db[order_id] = order
        
        # Clear cart after successful order
        if user_id in carts_db:
            carts_db[user_id]["items"] = []
        
        # Generate invoice
        invoice_pdf = mock_generate_invoice_pdf(order)
        
        # Send order confirmation email
        user = current_user
        email_content = f"""
        <h2>Order Confirmation</h2>
        <p>Hello {user['firstName']},</p>
        <p>Thank you for your order! Your order has been successfully placed.</p>
        <p><strong>Order Number:</strong> {order['orderNumber']}</p>
        <p><strong>Total Amount:</strong> ${total_amount:.2f}</p>
        <p><strong>Status:</strong> {order['status'].title()}</p>
        <p>We'll send you another email when your order ships.</p>
        <p>Thank you for shopping with AllBlackery!</p>
        """
        mock_send_email(user['email'], f"Order Confirmation - {order['orderNumber']}", email_content)
        
        return {
            "success": True,
            "message": "Order created successfully",
            "data": {
                "orderId": order_id,
                "orderNumber": order['orderNumber'],
                "status": order['status'],
                "total": total_amount
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create order: {str(e)}")

@app.get("/api/orders/{order_id}")
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    """Get specific order details"""
    try:
        user_id = current_user['id']
        
        if order_id not in orders_db:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order = orders_db[order_id]
        
        # Check if user owns this order
        if order["userId"] != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        return {
            "success": True,
            "message": "Order retrieved successfully",
            "data": order
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve order: {str(e)}")

@app.get("/api/orders/{order_id}/invoice")
async def get_order_invoice(order_id: str, current_user: dict = Depends(get_current_user)):
    """Generate and download order invoice"""
    try:
        user_id = current_user['id']
        
        if order_id not in orders_db:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order = orders_db[order_id]
        
        # Check if user owns this order
        if order["userId"] != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        # Generate PDF invoice
        invoice_pdf = mock_generate_invoice_pdf(order)
        
        return {
            "success": True,
            "message": "Invoice generated successfully",
            "data": {
                "orderId": order_id,
                "invoiceUrl": f"/api/orders/{order_id}/invoice/download",
                "invoiceGenerated": True
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate invoice: {str(e)}")

# Payments API with Stripe integration
@app.post("/api/payments/create-intent")
async def create_payment_intent(amount: float, currency: str = "usd"):
    """Create Stripe payment intent"""
    try:
        # Convert amount to cents for Stripe
        amount_cents = int(amount * 100)
        
        # Create payment intent
        intent = mock_stripe_create_payment_intent(amount_cents, currency)
        
        return {
            "success": True,
            "message": "Payment intent created successfully",
            "data": intent
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create payment intent: {str(e)}")

@app.post("/api/payments/webhook")
async def stripe_webhook(request: dict):
    """Handle Stripe webhook events"""
    try:
        print("🔔 MOCK STRIPE WEBHOOK RECEIVED")
        print(f"Event: {request}")
        
        # TODO: Replace with actual Stripe webhook handling
        # event = stripe.Webhook.construct_event(
        #     payload, sig_header, os.environ.get('STRIPE_WEBHOOK_SECRET')
        # )
        
        # Handle the event
        event_type = request.get('type', 'payment_intent.succeeded')
        
        if event_type == 'payment_intent.succeeded':
            payment_intent = request.get('data', {}).get('object', {})
            print(f"Payment succeeded: {payment_intent.get('id')}")
            
            # Update order status
            # Find order by payment intent ID and update status
            
        return {"success": True}
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook error")

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "message": "Endpoint not found",
            "data": None
        }
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error",
            "data": None
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)