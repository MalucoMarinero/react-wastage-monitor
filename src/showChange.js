export default function (name, key, before, after) {
  console.log(
    '%c' + name,
    'font-weight: bold;',
    (before[key] && before[key].toJS && '(immutable):') || '',
    before[key]
      ? before[key].toJS
        ? before[key].toJS()
        : before[key]
      : before[key],
    '->',
    (after[key] && after[key].toJS && '(immutable):') || '',
    after[key]
      ? (after[key].toJS
        ? after[key].toJS()
        : after[key])
      : after[key]
  );
}
