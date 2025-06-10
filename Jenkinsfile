pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'compose.yaml'
    }

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    def services = [
                        'api-docs-service',
                        'authentication-service',
                        'order-service',
                        'products-service'
                    ]

                    for (service in services) {
                        echo "Building ${service}..."
                        dir(service) {
                            bat "podman build -t ${service}:latest ."
                        }
                    }
                }
            }
        }

        stage('Start Containers') {
            steps {
                bat "podman compose -f ${COMPOSE_FILE} up -d"
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Cleaning up...'
            bat "podman compose -f ${COMPOSE_FILE} down"
        }
    }
}
