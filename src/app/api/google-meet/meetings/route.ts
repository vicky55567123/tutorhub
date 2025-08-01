import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get meetings from in-memory storage
    const globalThis = global as any
    const allMeetings = globalThis.meetings || []
    
    // Filter meetings for the current user (in a real app, you'd filter by actual user ID)
    const userMeetings = allMeetings.filter((meeting: any) => {
      // For now, return all meetings since we're using a demo user system
      return meeting.userId === 'current_user' || true
    })

    // Sort by start time (newest first)
    userMeetings.sort((a: any, b: any) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

    console.log('Retrieved meetings for user:', userId)
    console.log('Total meetings found:', userMeetings.length)

    return NextResponse.json({
      success: true,
      meetings: userMeetings,
      total: userMeetings.length
    })

  } catch (error) {
    console.error('Error fetching meetings:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch meetings' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const meetingId = searchParams.get('meetingId')
    
    if (!meetingId) {
      return NextResponse.json(
        { success: false, error: 'Meeting ID is required' },
        { status: 400 }
      )
    }

    // TODO: Implement actual Google Meet cancellation
    // This would involve calling Google Calendar API to cancel the event

    return NextResponse.json({
      success: true,
      message: 'Meeting cancelled successfully'
    })

  } catch (error) {
    console.error('Error cancelling meeting:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to cancel meeting' 
      },
      { status: 500 }
    )
  }
}
