import pytest
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_contact_api():
    payload = dict(
        name='test',
        social='test@test.com'
    )
    
    response = client.post('/api/v1/contact/', payload)
    data = response.json()
    
    assert data['success'] == 'Письмо отправлено'
    
    
@pytest.mark.django_db
def test_blog_api():
    response = client.get('/api/v1/blog/')
    
    assert response.status_code == 200
    assert len(response.data) > 0
    

@pytest.mark.django_db
def test_cinema_api():
    response = client.get('/api/v1/cinema/')
    
    assert response.status_code == 200
    assert len(response.data) > 0
    
    
@pytest.mark.django_db
def test_episode_detail_api():
    response = client.get('/api/v1/episodes/test')
    
    assert response.status_code == 301
    
    