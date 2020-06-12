node {
         stage('Clone repository') {
             checkout scm
         }
         stage('yarn build') {
            env.NODEJS_HOME = "${tool 'Node 6.x'}"
         	env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

            sh 'npm install -g yarn'
            sh 'yarn install'
            sh 'yarn build'
         }

         stage('Build & Push image') {
              docker.withRegistry('https://registry.hub.docker.com', 'unknown9732-docker') {
                 def image = docker.build("unknown9732/wing-fe:latest")
                 image.push()
                 sh 'sudo docker service update --image unknown9732/wing-fe wing-fe'
             }
         }
     }
