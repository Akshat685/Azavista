import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string[] }> }
) {
  try {
    const { filename } = await params
    const fullFilename = filename[0] // e.g., "e9042a2fad4c6105dc4fd65ae3923325729237d4-724x483.jpg"
    
    if (!fullFilename) {
      return NextResponse.json({ error: 'File ID is required' }, { status: 400 })
    }

    // Extract the ID from the filename (remove dimensions and extension)
    // Format: "id-widthxheight.extension" -> "id"
    const fileIdString = fullFilename.split('-')[0]
    
    if (!fileIdString) {
      return NextResponse.json({ error: 'Invalid file ID format' }, { status: 400 })
    }

    // Try to parse as number first, fallback to string
    let fileId: string | number = fileIdString
    if (!isNaN(Number(fileIdString))) {
      fileId = Number(fileIdString)
    }

    console.log(`Processing media request:`, {
      fullFilename,
      fileIdString,
      fileId,
      fileIdType: typeof fileId
    })

    const payload = await getPayload({ config })
    
    // Try to get the media document by ID first
    let media = null
    try {
      media = await payload.findByID({
        collection: 'media',
        id: fileId,
      })
    } catch (idError) {
      console.log(`Failed to find by ID ${fileId} (${typeof fileId}), trying by filename:`, idError)
      
      // Fallback: search by filename
      try {
        const results = await payload.find({
          collection: 'media',
          where: {
            filename: {
              equals: fullFilename,
            },
          },
        })
        
        if (results.docs.length > 0) {
          media = results.docs[0]
        }
      } catch (filenameError) {
        console.log(`Failed to find by filename ${fullFilename}:`, filenameError)
      }
    }

    if (!media) {
      console.log(`Media not found for ID: ${fileId}`)
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    console.log(`Found media:`, {
      id: media.id,
      cloudinaryUrl: media.cloudinary?.secure_url,
      url: media.url,
      thumbnailURL: media.thumbnailURL
    })

    // If we have a Cloudinary URL, redirect to it
    if (media.cloudinary?.secure_url) {
      console.log(`Redirecting to Cloudinary URL: ${media.cloudinary.secure_url}`)
      return NextResponse.redirect(media.cloudinary.secure_url)
    }

    // If we have a regular URL, redirect to it
    if (media.url) {
      console.log(`Redirecting to URL: ${media.url}`)
      return NextResponse.redirect(media.url)
    }

    // If we have a thumbnail URL, redirect to it
    if (media.thumbnailURL) {
      console.log(`Redirecting to thumbnail URL: ${media.thumbnailURL}`)
      return NextResponse.redirect(media.thumbnailURL)
    }

    console.log(`No valid URL found for media ID: ${fileId}`)
    return NextResponse.json({ error: 'No valid URL found for media' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching media:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
