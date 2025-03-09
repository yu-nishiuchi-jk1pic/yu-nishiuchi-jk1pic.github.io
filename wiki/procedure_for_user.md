# Academic Website Template User Guide

This guide explains the process of forking an academic website template, replacing it with your own information, and publishing it on GitHub Pages. All steps can be completed entirely on GitHub.

## Table of Contents

- [Academic Website Template User Guide](#academic-website-template-user-guide)
  - [Table of Contents](#table-of-contents)
  - [1. Fork the repository on GitHub](#1-fork-the-repository-on-github)
  - [2. Change repository settings](#2-change-repository-settings)
    - [1. Grant write permissions to GitHub Actions](#1-grant-write-permissions-to-github-actions)
  - [3. Edit profile information](#3-edit-profile-information)
    - [Edit English configuration file](#edit-english-configuration-file)
    - [Edit Japanese configuration file](#edit-japanese-configuration-file)
  - [4. Configure homepage and multilingual support](#4-configure-homepage-and-multilingual-support)
    - [English bio](#english-bio)
    - [Japanese bio](#japanese-bio)
  - [5. Edit career and award information](#5-edit-career-and-award-information)
    - [Edit career information](#edit-career-information)
    - [Edit awards](#edit-awards)
    - [Edit research grants information](#edit-research-grants-information)
    - [Edit project information](#edit-project-information)
  - [6. Update publication information](#6-update-publication-information)
    - [Get data from ResearchMap](#get-data-from-researchmap)
    - [Upload CSV files](#upload-csv-files)
    - [Directly edit existing CSV files](#directly-edit-existing-csv-files)
  - [7. Changing Profile Images and Favicon](#7-changing-profile-images-and-favicon)
    - [Changing Images](#changing-images)
  - [8. SEO Optimization Customization](#8-seo-optimization-customization)
    - [Generating sitemap.xml and robots.txt](#generating-sitemapxml-and-robotstxt)
    - [Editing index.html](#editing-indexhtml)
  - [9. Publish on GitHub Pages](#9-publish-on-github-pages)
    - [Re-run the deployment workflow](#re-run-the-deployment-workflow)
  - [10. Troubleshooting](#10-troubleshooting)
    - [API data generation issues](#api-data-generation-issues)
    - [Multilingual switching issues](#multilingual-switching-issues)
    - [Build errors](#build-errors)
    - [Other issues](#other-issues)
  - [Extended Customization](#extended-customization)

## 1. Fork the repository on GitHub

First, fork the template repository to your GitHub account.

1. Go to the template repository page (https://github.com/sigma-users/personal-website-template)
2. Click the "Fork" button in the top right
3. Change the repository name if needed (e.g., `yourusername.github.io`)
4. Click the "Create Fork" button to complete the process

> **Tip**: If you want to publish it as a user site, naming the repository `yourgithubusername.github.io` is recommended.

## 2. Change repository settings

Change the basic settings of your forked repository.

1. Click the "Settings" tab on the page of the forked repository.
2. Find the "GitHub Pages" section in the left-hand menu.
3. Select "GitHub Actions" as the source (to use the deployment workflow).

> **Note**: If there is no deployment workflow, you will set it up in a later step.

### 1. Grant write permissions to GitHub Actions
First, set permissions to allow the deployment workflow to write to the gh-pages branch:

1. Click the "Settings" tab on your repository page
2. From the left menu, click "Actions" → "General"
3. Scroll to the "Workflow permissions" section
4. Select the "Read and write permissions" option
5. Click the "Save" button to save the changes

## 3. Edit profile information

Edit the multilingual configuration files to update your profile information.

### Edit English configuration file

1. In your forked repository, open the `public/locales/en/translations.json` file
2. Click "Edit this file" (the pencil icon)
3. Replace the following sections with your information:
   - `header.name`: Name displayed in the header
   - `bio.name`: English name
   - `bio.nameJp`: Japanese name
   - `bio.phd`: English PhD name if applicable (set to `""` if not)
   - `bio.phdJp`: Japanese PhD name if applicable (set to `""` if not)
   - `bio.position`: Position (e.g., "Associate Professor")
   - `bio.affiliation`: Affiliation (e.g., "Department of Engineering, University of Tokyo")
   - `bio.email`: Email address
   - `bio.github`, `bio.scholar`, `bio.orcid`, `bio.researchmap`: Links to your profile pages (set to `""` if not)
   - `bio.researchTags`: Array of research keywords
   - `contact.emailAdress`: EMail adress（`hoge[at]sigma.t.u-tokyo.ac.jp`）
   - `contact.phoneNumber`: Phone number
   - `contact.addressLine1`, `contact.addressLine2`, `contact.addressLine3`: Address lines
   - `contact.linkedin`, `contact.facebook`, `contact.twitter`: Social media links (set to `""` if not)
4. Click the "Commit changes..." button to save changes
5. Enter a commit message (e.g., "Update English profile information") and click "Commit changes"

> **Tip**: For unnecessary items, set an empty string `""` or enter `null`.
> **Tip**: If you want to remove the social media links at the bottom of the page, set `contact.socialMedia` to `""`.

### Edit Japanese configuration file

1. Similarly, open the `public/locales/ja/translations.json` file
2. Click "Edit this file"
3. Replace the same sections with your Japanese information
4. Click the "Commit changes..." button to save changes

## 4. Configure homepage and multilingual support

Edit the bio markdown files.

### English bio

1. Open the `public/content/bio/bio_en.md` file
2. Click "Edit this file"
3. Rewrite your bio in markdown format:
   - Use headings (`##`) to structure your content
   - Describe your research, career highlights, specialties, etc.
   - Utilize bullet points (`-`) as needed
4. Click the "Commit changes..." button to save changes
> **Tip**: By default, GitHub and ORCID are displayed as icons. If you prefer to display them as text, set `bio.github`, `bio.orcid`, etc., to `""` and include them in this markdown file as `- GitHub: [https://github.com](https://github.com)`. Refer to the examples in this template for guidance.

### Japanese bio

1. Open the `public/content/bio/bio_ja.md` file
2. Click "Edit this file"
3. Rewrite the same content in Japanese
4. Click the "Commit changes..." button to save changes

## 5. Edit career and award information

Edit the JSON files for your career, awards, research projects, etc.

### Edit career information

1. Open the `public/content/career/career_en.json` file
2. Click "Edit this file"
3. Enter your education and career information following the JSON format:
   ```json
   [
     {
       "id": "career-1",
       "position": "Your Position",
       "organization": "Your Organization",
       "location": "Location",
       "startDate": "2020",
       "endDate": null,  // null for current position
       "description": "Description of your role",
       "type": "work"    // "work" or "education"
     },
     // other career items...
   ]
   ```
4. Click "Commit changes..." to save
5. Similarly update `public/content/career/career_ja.json` with Japanese information

> **Note**: Keep the `"id"` consistent between Japanese and English. The order of entries doesn't matter.

### Edit awards

1. Open the `public/content/awards/awards_en.json` file
2. Enter your award information:
   ```json
   [
     {
       "id": "award-1",
       "title": "Award Name",
       "awarder": "Awarding Organization",
       "date": "2023-06",
       "description": "Description of the award"
     },
     // other awards...
   ]
   ```
3. Save the changes
4. Similarly update `public/content/awards/awards_ja.json` with Japanese information

> **Note**: Keep the `"id"` consistent between Japanese and English. The order of entries doesn't matter.

> **Tip**: If you don't have any applicable items, enter an empty JSON:
```json
   [
     // don't write anything here
   ]
```

### Edit research grants information

1. Open the `public/content/awards/grants_en.json` file
2. Enter your research grant information:
   ```json
   [
     {
       "id": "grant-1",
       "title": "Fellowship",
       "funder": "Agency",
       "number": "Grant No",
       "period": "2023-2025",
       "description": "Project 1"
     },
     // other grant items...
   ]
   ```
3. Save the changes
4. Similarly update `public/content/awards/grants_ja.json` with Japanese information

> **Note**: Keep the `"id"` consistent between Japanese and English. The order of entries doesn't matter.

> **Tip**: If you don't have any applicable items, enter an empty JSON:
```json
   [
     // don't write anything here
   ]
```

### Edit project information

1. Open the `public/content/awards/projects_en.json` file
2. Enter your project information:
   ```json
   [
     {
       "id": "project-1",
       "title": "Project Name",
       "description": "Description of the project",
       "url": "https://project-url.com",
       "languages": ["Language1", "Language2"],
       "languageColors": ["#color1", "#color2"]
     },
     // other project items...
   ]
   ```
3. Save the changes
4. Similarly update `public/content/awards/projects_ja.json` with Japanese information

> **Note**: Keep the `"id"` consistent between Japanese and English. The order of entries doesn't matter.

> **Tip**: If you don't have any applicable items, enter an empty JSON:
```json
   [
     // don't write anything here
   ]
```

## 6. Update publication information

Update your research publication information (papers and presentations) using CSV files.

### Get data from ResearchMap

1. Log in to ResearchMap (https://researchmap.jp/)
2. Click the "Achievements" tab in your portal
3. Click "Export" in the "Papers" or "Presentations" section to download CSV files

### Upload CSV files

1. Open the `data` directory in your forked repository
2. Click "Add file" → "Upload files"
3. Upload the downloaded papers CSV file as `rm_published_papers.csv`
4. Upload the downloaded presentations CSV file as `rm_presentations.csv`
5. Click the "Commit changes..." button to commit the changes

> **Note**: If the CSV file format or column names differ from the template's expectations, you may need to edit the `scripts/generatePublicApi.cjs` file to adjust the mapping.

### Directly edit existing CSV files

1. Open the `data/rm_published_papers.csv` file
2. Click "Edit this file"
3. Edit the paper information following the CSV format:
   ```
   published_papers
   ID,Title(English),Title(Japanese),Authors(English),Authors(Japanese),Journal(English),Journal(Japanese),Publication Date,DOI,Is Major Achievement
   paper-1,Your Paper Title,あなたの論文タイトル,"Author 1, Author 2","著者1, 著者2",Journal Name,ジャーナル名,2023-01,10.1234/abcd,true
   ```
4. Save the changes
5. Similarly update `data/rm_presentations.csv`:
   ```
   presentations
   ID,Title(English),Title(Japanese),Presenters(English),Presenters(Japanese),Conference(English),Conference(Japanese),Presentation Date,Location(English),Location(Japanese),Invited
   presentation-1,Your Presentation Title,あなたの発表タイトル,"Author 1, Author 2","著者1, 著者2",Conference Name,会議名,2023-01-01,Location,場所,false
   ```

> **Note**: The first line is skipped, so put the header on the second line and records from the third line onward.

## 7. Changing Profile Images and Favicon

### Changing Images

Change your profile image and lab logo.

1. Open the `public/images` directory in your forked repository
2. Click "Add file" → "Upload files"
3. Upload your new profile image named `profile.png`
   - Or replace the existing `profile.png`
4. Click the "Commit changes..." button to commit your changes

> **Tip**: Pay attention to image size and aspect ratio. A square format (1:1) is recommended for profile images, while a landscape format is recommended for logos.


## 8. SEO Optimization Customization

### Generating sitemap.xml and robots.txt

Change the URL to your GitHub Pages URL.
1. Open the `scripts/generateSeoFiles.cjs` file in your forked repository
2. Replace the following section with your GitHub username:
   ```javascript
   // Configuration - Please change the site URL to your actual one
   const SITE_URL = 'https://username.github.io';
   ```
3. Save and commit your changes

> **Tip**: This will generate `https://username.github.io/sitemap.xml` and `https://username.github.io/robots.txt`.

### Editing index.html

Customize the SEO and Google Search Console information in the index.html file.

1. Open the `public/index.html` file in your forked repository
2. Replace the following information with your GitHub username or full name:
   - Change the content inside the `<title>` tag to your name
   - Edit the `content` attribute of `<meta name="description">` to match your research
   - Change the `content` attribute of `<meta name="author">` to your name
   - Change the `href` attribute of `<link rel="canonical">` to the URL of your GitHub Pages
   - Change `"url"` and `"target"` in `<script type="application/ld+json">` to the URL of your GitHub Pages
3. Save and commit your changes

> **Tip**: Proper SEO configuration improves how your site appears in search engines.

## 9. Publish on GitHub Pages

Publish your site on GitHub Pages.

1. Click the "Actions" tab in your forked repository
2. Find and select the "Deploy to GitHub Pages" workflow
   - If the workflow is already running or completed, check its results
   - If you cannot find the workflow, create the workflow file with these steps:
     a. Open the ".github/workflows" directory
     b. Check if there is a "deploy.yml" file
     c. If not, create a new one and copy the content from the same file in the template repository
3. After the workflow succeeds, check the published URL in "Settings" → "Pages"

> **Tip**: The initial deployment may take a few minutes. Please be patient.

### Re-run the deployment workflow
If needed, re-run the workflow with these steps:

1. Click the "Actions" tab on your repository page
2. Select "Deploy to GitHub Pages" from the "Workflows" on the left
3. Click the "Run workflow" button in the top right
4. Click the "Run workflow" button again to start the execution

## 10. Troubleshooting

Here are some solutions for common issues.

### API data generation issues

- **Symptom**: Papers or presentations data not displaying
- **Solution**: Check if the API data generation script is running correctly in GitHub Actions
  1. Check the latest workflow execution in the "Actions" tab of your repository
  2. If there are errors, check the CSV file format
  3. If necessary, edit `scripts/generatePublicApi.cjs` to adjust the CSV column name mapping

### Multilingual switching issues

- **Symptom**: Content doesn't change or display when switching languages
- **Solution**: Check if language files are loading correctly
  1. Open the Network tab in your browser's developer tools
  2. Check if the corresponding language file (`translations.json`) is loading successfully
  3. If necessary, check the settings in `src/i18n.ts`

### Build errors

- **Symptom**: GitHub Actions build fails
- **Solution**:
  1. Check the workflow logs to identify the specific error
  2. Common causes:
     - JSON file syntax errors (extra commas or missing closing brackets)
     - Missing required files
     - Path issues

### Other issues

If you have problems not resolved by the above:
1. Search for existing issues in the template repository's GitHub Issues
2. If no solution is found, create a new Issue to ask your question

## Extended Customization

After completing the basic setup, you can further customize these parts:

1. Change the color scheme in `tailwind.config.js`
2. Edit component files in `src/components` to adjust the layout and functionality
3. Update meta tags in `public/index.html`

---

I hope this guide helps you create a wonderful academic website! If you have any improvements or questions, please share them through Issues or pull requests.

Happy coding! 🚀
