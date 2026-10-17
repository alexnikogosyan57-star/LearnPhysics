export const TeacherState = Object.freeze({
  INTRODUCING: 'INTRODUCING',
  ASKING: 'ASKING',
  WAITING: 'WAITING',
  HINTING: 'HINTING',
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT',
  EXPLAINING: 'EXPLAINING',
  EXPERIMENTING: 'EXPERIMENTING',
  REVIEWING: 'REVIEWING',
  COMPLETED: 'COMPLETED',
});

export function getTeacherPose(state) {
  switch (state) {
    case 'INTRODUCING':
    case TeacherState.INTRODUCING:
      return 'greeting';
    case 'ASKING':
    case TeacherState.ASKING:
      return 'point-right';
    case 'WAITING':
    case TeacherState.WAITING:
      return 'thinking';
    case 'HINTING':
    case TeacherState.HINTING:
      return 'point-left';
    case 'CORRECT':
    case TeacherState.CORRECT:
      return 'success-answer';
    case 'INCORRECT':
    case TeacherState.INCORRECT:
      return 'confused';
    case 'EXPLAINING':
    case TeacherState.EXPLAINING:
      return 'eureka';
    case 'EXPERIMENTING':
    case TeacherState.EXPERIMENTING:
      return 'thinking';
    case 'REVIEWING':
    case TeacherState.REVIEWING:
      return 'confused';
    case 'COMPLETED':
    case TeacherState.COMPLETED:
      return 'success-complete';
    default:
      return state || 'thinking';
  }
}
