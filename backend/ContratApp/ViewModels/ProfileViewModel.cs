using System.ComponentModel.DataAnnotations;

namespace ContratApp.ViewModels
{
    public class ProfileViewModel
    {
        [MaxLength(256)]
        public string? FirstName { get; set; }
        [MaxLength(256)]
        public string? LastName { get; set; }

        [MaxLength(256)]
        public string? DNI { get; set; }

        public DateTime? BirthDay { get; set; }

        [MaxLength(256)]
        public string? Country { get; set; }

        [MaxLength(256)]
        public string? State { get; set; }

        [MaxLength(256)]
        public string? Location { get; set; }

        [MaxLength(256)]
        public string? Cellphone { get; set; }

    }
}
