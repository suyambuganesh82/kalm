#!/bin/sh

echo "setup Kalm"
echo ""

kubectl apply -f https://raw.githubusercontent.com/kapp-staging/kapp/master/kapp-install-operator.yaml
## same as running this in code repo:
#kubectl apply -f kapp-install-operator.yaml

echo -e "\nwaiting for installation of CRD"
sleep 3

kubectl apply -f https://raw.githubusercontent.com/kapp-staging/kapp/master/kapp-install-kappoperatorconfig.yaml
## same as running this in code repo:
#kubectl apply -f kapp-install-kappoperatorconfig.yaml

echo -e "\ndone"
