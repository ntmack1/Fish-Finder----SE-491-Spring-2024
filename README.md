# Fish-Finder----SE-491-Spring-2024

## Using Maven
Here's how you can use Maven to build, test, and run this project.

### Prerequisites

Ensure that you have the following installed:
- Java JDK 20 or higher
- Maven 3.9.6 or higher
- Node.js 20.12.2 or higher
- npm 10.5.0 or higher (usually bundled with Node.js)

You can check your Java version by running `java -version`, your Maven version by running `mvn -version`, your node version by running `node -v` and your npm version by running `npm -v` in your terminal.

### Building the Project

To build the project, open your terminal and run the following command from the root of the project directory:

    mvn clean install

This command cleans the previous builds and compiles the source code, runs tests, and packages the binary code in a JAR file.

### Running Tests

To execute all tests in the project, use the following Maven command:

    mvn test

This command runs all tests defined in the project and provides a summary of the test results.

### Running the Application Backend

To run the application backend, you need to specify the main class if it's not already defined in the Maven configuration. Use the following command:

    mvn spring-boot:run

This command will start the application and Spring Boot's embedded server, making your application accessible at `http://localhost:8080`. You can access the React frontend by navigating to this URL in your web browser.


### Packaging the Project

To package your project into a JAR file, ensuring it includes all the necessary dependencies, run:

    mvn package

This creates a JAR file in the `target` directory of your project, which you can distribute or run.

### Cleaning the Project

If you need to clean up the project (remove compiled files and other artifacts), Maven can do this with:

    mvn clean

This will clean the `target` directory, removing all the build artifacts.
