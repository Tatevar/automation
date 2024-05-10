FROM cypress/browsers:latest 

# Copy files
COPY ./cypress ./cypress
COPY ./cypress.json .
COPY ./package.json .
COPY ./package-lock.json .

# Installing Dependencies
RUN npm install

# Run tests
ENTRYPOINT ["npx", "cypress", "run", "--headless"] 
CMD [""]