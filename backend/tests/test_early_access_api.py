"""
Backend API Tests for insig8 Landing Page - Early Access Endpoint
Tests the /api/early-access endpoint for signup functionality
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestRootEndpoint:
    """Root API endpoint tests"""

    def test_root_returns_hello_world(self):
        """Test that root endpoint returns hello world message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"


class TestEarlyAccessEndpoint:
    """Early Access signup endpoint tests"""

    def test_create_early_access_signup_success(self):
        """Test successful early access signup creation"""
        unique_email = f"TEST_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "email": unique_email,
            "company": "Test Company",
            "role": "CS Lead"
        }
        response = requests.post(
            f"{BASE_URL}/api/early-access",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert data["status"] == "created"
        assert "message" in data
        assert "Welcome to the waitlist" in data["message"]

    def test_duplicate_email_returns_duplicate_status(self):
        """Test that duplicate email returns duplicate status"""
        unique_email = f"TEST_dup_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": unique_email, "company": "Test Co", "role": "Tester"}
        
        # First signup
        first_response = requests.post(
            f"{BASE_URL}/api/early-access",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert first_response.status_code == 200
        assert first_response.json()["status"] == "created"
        
        # Second signup with same email
        second_response = requests.post(
            f"{BASE_URL}/api/early-access",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert second_response.status_code == 200
        data = second_response.json()
        assert data["success"] == True
        assert data["status"] == "duplicate"
        assert "already on our list" in data["message"]

    def test_signup_with_only_email(self):
        """Test signup with only required email field"""
        unique_email = f"TEST_min_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": unique_email}
        
        response = requests.post(
            f"{BASE_URL}/api/early-access",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert data["status"] == "created"

    def test_invalid_email_format(self):
        """Test that invalid email format returns error"""
        payload = {"email": "not-a-valid-email"}
        
        response = requests.post(
            f"{BASE_URL}/api/early-access",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        # Pydantic should reject invalid email
        assert response.status_code == 422

    def test_missing_email_returns_error(self):
        """Test that missing email returns validation error"""
        payload = {"company": "Test Co", "role": "Tester"}
        
        response = requests.post(
            f"{BASE_URL}/api/early-access",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 422


class TestEarlyAccessCount:
    """Early Access count endpoint tests"""

    def test_get_early_access_count(self):
        """Test getting early access signup count"""
        response = requests.get(f"{BASE_URL}/api/early-access/count")
        assert response.status_code == 200
        data = response.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] >= 0


class TestStatusEndpoints:
    """Status check endpoint tests"""

    def test_create_status_check(self):
        """Test creating a status check"""
        payload = {"client_name": "TEST_client"}
        response = requests.post(
            f"{BASE_URL}/api/status",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["client_name"] == "TEST_client"
        assert "timestamp" in data

    def test_get_status_checks(self):
        """Test getting all status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
