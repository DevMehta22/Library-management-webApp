pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Using stored credentials
    }
    
    stages{
        stage('clone'){
            steps {
                echo 'cloning the repository'
                git url:"https://github.com/DevMehta22/Library-management-webApp.git", branch:"ci-cd"
            }
        }
        stage('build'){
            steps {
                echo "building the images"
                withCredentials([file(credentialsId: 'backend-env-file', variable: 'BACKEND_ENV')]) {
                sh 'cp $BACKEND_ENV backend/.env'
                }
                sh 'docker-compose build'
            }
        }
        stage('login-dockerhub'){
            steps{
                sh ' docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p  ${DOCKERHUB_CREDENTIALS_PSW}'
                echo "Login success"
                
            }
        }
        stage('push-images'){
            steps{
                sh '''
                docker tag book-manager-master-frontend ${DOCKERHUB_CREDENTIALS_USR}/book-manager-master-frontend:latest
                docker tag book-manager-master-backend ${DOCKERHUB_CREDENTIALS_USR}/book-manager-master-backend:latest
                docker push ${DOCKERHUB_CREDENTIALS_USR}/book-manager-master-backend:latest
                docker push ${DOCKERHUB_CREDENTIALS_USR}/book-manager-master-frontend:latest
                '''
                echo "Images pushed to dockerhub"
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
