function maskPhone(phone: string): string {
	if (phone.length < 6) {
		// Nếu số quá ngắn thì không che được, trả về nguyên gốc
		return phone;
	}

	const prefix = phone.slice(0, 2); // Lấy 2 số đầu
	const suffix = phone.slice(-3); // Lấy 3 số cuối
	const masked = '*'.repeat(phone.length - 5); // Phần ở giữa thay bằng dấu *

	return prefix + masked + suffix;
}

export default maskPhone;
