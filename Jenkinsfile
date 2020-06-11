node {
     stage('Clone repository') {
         checkout scm
     }

     stage('chmod') {
         sh 'chmod +x gradlew'
     }

     stage('Gradle Build') {
         sh './gradlew bootjar'
         sh 'cp /var/lib/jenkins/workspace/wing-music/build/libs/*.jar ./'
     }

     stage('Build & Push image') {
          docker.withRegistry('https://registry.hub.docker.com', 'unknown9732-docker') {
             sh 'ls'
             sh 'pwd'
             def image = docker.build("unknown9732/wing-music:latest")
             image.push()
             sh 'sudo docker service update --image unknown9732/wing-music wing-music'
         }
     }
 }