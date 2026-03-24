# Demo Lambda API with CI/CD

This is a sample AWS serverless project demonstrating a CI/CD workflow using **AWS CodePipeline**, **CodeBuild**, and **AWS SAM/CloudFormation**. 

The pipeline performs tests, builds artifacts, deploys to a **Dev** environment, pauses for a **Manual Approval**, and finally deploys to a **Prod** environment.

## Architecture

1. **Lambda Function**: A Node.js API endpoint that displays a simple message based on the active environment.
2. **API Gateway**: Provides the HTTP trigger.
3. **App Template (`template.yaml`)**: CloudFormation/SAM stack representing the Application itself.
4. **Pipeline Template (`pipeline.yaml`)**: CloudFormation stack representing the CI/CD pipeline infrastructure.
5. **CodeBuild (`buildspec.yml`)**: Tests the code, bundles assets, and packages standard CloudFormation templates.

## How to setup

1. **Connect GitHub to AWS**: 
   - Open the AWS Console -> Developer Tools -> Settings -> Connections.
   - Create a global connection with your GitHub account.
   - Use the `Connection ARN` when deploying the pipeline.

2. **Deploy the Pipeline**:
   ```bash
   aws cloudformation create-stack \
       --stack-name demo-lambda-pipeline \
       --template-body file://pipeline.yaml \
       --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
       --parameters \
           ParameterKey=GitHubOwner,ParameterValue=YOUR_GITHUB_OWNER \
           ParameterKey=GitHubRepo,ParameterValue=YOUR_REPO_NAME \
           ParameterKey=GitHubBranch,ParameterValue=main \
           ParameterKey=CodeStarConnectionArn,ParameterValue=YOUR_CONNECTION_ARN
   ```
   
3. **Commit your code**:
   Push this directory to your configured GitHub repository via the `main` branch. 

4. **Watch CodePipeline**:
   - The pipeline will trigger automatically.
   - It runs `npm test` and `sam package`.
   - It handles **Dev Deployment**.
   - It will stop at **Prod Approval** waiting for you to manually clicking "Review" and "Approve" in the AWS Console.
   - It handles **Prod Deployment**.
