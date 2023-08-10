# TicketingApp-FinaHustProject

1. Install Docker Desktop

2. Enable Kubernetes engine in Docker Desktop

3. kubectl create secret generic jwt-secret --from-literal=JWT_KEY="your_key"

4. kubectl create secret generic stripe-secret --from-literal STRIPE_KEY="your_Stripe_key"

5. kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml

6. docker login

7. kubectl get pods -n ingress-nginx

8. kubectl get validatingwebhookconfigurations

9. kubectl get service -n ingress-nginx

10. skaffold dev
