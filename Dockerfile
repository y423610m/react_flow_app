FROM ubuntu

USER root

RUN echo "# --- my scripts ---" >> ~/.bashrc && echo "cd ~/" >> ~/.bashrc
RUN echo "reset1"
RUN apt update && apt install -y software-properties-common less wget zip vim curl net-tools build-essential && \
    add-apt-repository -y ppa:ubuntu-toolchain-r/test

# node & npm
RUN apt update && apt install -y curl

# RUN useradd -m -s /bin/bash appuser && echo "appuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER ubuntu
WORKDIR /home/ubuntu

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash 
ENV NVM_DIR="/home/ubuntu/.nvm"
ENV PATH="$NVM_DIR/versions/node/v22.0.0/bin:$PATH"
RUN [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm install 22 && npm install -g pnpm axios

CMD ["bash"]

# npx create-react-app my-app --template typescript
# npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
# pnpm dev
# npm install axios

# TODO npm install axios not working
# TODO npm install react-router-dom


# npx create-next-app@latest my-app



