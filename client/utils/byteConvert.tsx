export function byteConvert(bytes: number): string {
	if((bytes / (1024*1024*1024)) > 1) return ((bytes / (1024*1024*1024)).toFixed(2) + ' Gb');
	else if((bytes / (1024*1024)) > 1) return ((bytes / (1024*1024)).toFixed(2) + ' Mb');
	else if((bytes / (1024)) > 1) return ((bytes / (1024)).toFixed(2) + ' Kb');

	return (bytes.toString() + ' B');
}