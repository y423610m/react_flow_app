export REACT_FLOW_APP_IMAGE_NAME=react_flow_app_image
export REACT_FLOW_APP_CONTAINER_NAME=react_flow_app_container
export REACT_FLOW_APP_EXTERNAL_PORT=3000

function react_flow_app_build_docker(){
    docker build -t ${REACT_FLOW_APP_IMAGE_NAME} ${MY_REACT_FLOW_APP_ROOT}
}

function react_flow_app_run_docker(){
    docker run -v ${MY_REACT_FLOW_APP_ROOT}:/home/ubuntu/react_flow_app -p ${REACT_FLOW_APP_EXTERNAL_PORT}:3000 --network my_network --name ${REACT_FLOW_APP_CONTAINER_NAME} -it ${REACT_FLOW_APP_IMAGE_NAME}
}

function react_flow_app_exec_docker(){
    docker exec -it ${REACT_FLOW_APP_CONTAINER_NAME} bash
}

function react_flow_app_commit_docker(){
    docker commit ${REACT_FLOW_APP_CONTAINER_NAME} ${REACT_FLOW_APP_IMAGE_NAME}:latest
}

function react_flow_app_rm_docker(){
    containerid=$(docker ps | grep ${REACT_FLOW_APP_CONTAINER_NAME}  | tail -n 1 | awk '{print $1}')
    docker kill ${containerid}
    containerid=$(docker ps -a | grep ${REACT_FLOW_APP_CONTAINER_NAME} | tail -n 1 | awk '{print $1}')
    docker rm ${containerid}
}
