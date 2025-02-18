import { format } from 'date-fns'

interface DeadlineCardProps {
  deadline: {
    deadline: string
    period: {
      startMonth: string
      endMonth: string
      monthsIncluded: string[]
    }
  }
}

export function DeadlineCard({ deadline }: DeadlineCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-red-600 mb-4">
        Due Date: {formatDate(deadline.deadline)}
      </h2>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Period:</span>{' '}
          {format(new Date(deadline.period.startMonth), 'MMMM yyyy')} -{' '}
          {format(new Date(deadline.period.endMonth), 'MMMM yyyy')}
        </p>
        <div className="text-sm text-gray-500">
          <p className="font-medium mb-1">Months included:</p>
          <ul className="list-disc pl-5">
            {deadline.period.monthsIncluded.map((month) => (
              <li key={month}>{format(new Date(month), 'MMMM yyyy')}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}