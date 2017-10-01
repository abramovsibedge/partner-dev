export function dateString(time: number): string {
	let date = new Date(time);
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

	return (date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + ((date.getMinutes()>10)?date.getMinutes():('0'+date.getMinutes().toString())));
};