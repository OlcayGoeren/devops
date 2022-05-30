# DevOps Konzept

### Techstack

1. Application, Automation,runtime environment &nbsp;&nbsp;&nbsp;&nbsp; hi
2. Database &nbsp;&nbsp;&nbsp;&nbsp; hi
3. Version Control System
4.  CI/CD System
5.  Monitoring

* Application, Automation,runtime environment
    * aws (+terraform+kubernetes+load-balancer)

* Database
    * mongoDB
* Version Control System + CI/CD System
    * Gitlab
* Monitoring	
    * Prometheus (+Grafana) 

![Architektur](/techstack.jpg)
*Architektur*


![Architektur](/pipelline.jpg)
*CI/CD Pipeline*

Ich habe mich auf den oben genannten Tech-Stack entschieden, da dieser meiner Erfahrung nach die relevantesten Technologien abbildet. Die Architektur würde so aussehen, dass man mit Terraform eine ec2 Instanz steuern kann. Die ec2 Instanz wiederum soll zwei Kubernetes-Cluster besitzen. Alle eingehenden Requests werden über einen Load-balancer zu den entsprechenden Services weitergeleitet.

Es soll eine test und prod Umgebung geben, welche in getrennten Clustern stattfinden sollen. Beim mergen des Sourcecodes soll dieser zuerst in der test Umgebung getestet werden, durch bspw. Unit-Tests, erst nach erfolgreichem testing soll es möglich sein in den master branch zu mergen. Nach erfolgreichem merge soll die prod Umgebung aktualisiert und neu gebaut werden.
