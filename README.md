[![Netlify Status](https://api.netlify.com/api/v1/badges/a32062cc-6399-46ed-ad07-f88f01a5cce4/deploy-status)](https://app.netlify.com/sites/halloween-hackathon/deploys)

## 🎃 Halloween Hackathon Cloudinary 2024

Welcome to my submission for the **Halloween Hackathon** organized by Cloudinary and Midudev. This project showcases the use of Cloudinary’s media features to enhance a spooky Halloween experience with AI-generated masks and overlays. 

🚀 **Deploy**: [https://halloween-hackathon.netlify.app/](https://halloween-hackathon.netlify.app/)



<video src="demo.mp4"></video>


<br>


### 🌟 Project Overview

In this hackathon project, users can experience Halloween magic by applying amazing masks to their photos, either through overlays or AI-generated filters. The goal is to create an interactive and fun experience using Cloudinary's powerful media APIs.

<br>


### 🔮 Features

- **AI-Generated Masks**: Automatically generate spooky masks based on user-uploaded photos.
- **Overlay Masks**: Users can choose from a variety of pre-designed Halloween masks and overlays.
Real-time Image Transformations: Powered by Cloudinary's image processing and transformations.
Responsive Design: Fully functional on desktop and mobile devices.

<br>


### 🛠️ Tech Stack

This project uses the following technologies:

- Cloudinary: For image management, transformations, and AI integrations.
- Astro: A modern web framework for building the frontend.

<br>


### 🚀 Getting Started

To get started locally, follow these steps:

1. Clone the Repository

    ```bash
    git clone https://github.com/FrancoJavierGadea/Halloween-Hackathon.git
    ```

2. Install Dependencies

    ```bash
    npm install
    ```

3. Set Up Cloudinary

    Sign up for a Cloudinary account.

    Get your Cloudinary `API Key`, `API Secret`, and `Cloud Name` from the Cloudinary dashboard.

    Create a `.env` file in the root of the project and add your credentials:

    ```bash
    PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
    PUBLIC_CLOUDINARY_APP_KEY=your-api-key
    CLOUDINARY_APP_SECRET=your-api-secret
    ```

4. Run the Development Server

    ```
    npm run dev
    ```


<br>

### 🎨 How It Works

Upload Your Photo: Users can upload their own photo.

Choose Your Mask: Select from AI-generated masks or pre-designed overlays.

Preview and Download: Once the transformation is applied, users can preview and download the spooky result.

#### 📸 Cloudinary Transformations

This project makes heavy use of Cloudinary’s transformation features. Some key transformations include:

- Overlay Masks: Applying PNG overlays on top of user images.
- Face Detection: Automatically placing masks over detected faces.
- AI Effects: Generate masks based on user face features.