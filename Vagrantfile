# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  config.ssh.forward_agent = true

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = 'debian/jessie64'
  # config.vm.synced_folder '.', '/vagrant'
	config.vm.provision "shell", privileged: false, inline: <<-SHELL
		sudo apt-get update
		sudo apt-get install -y build-essential vim ntp ntpdate git-core
		curl -sSL https://get.rvm.io | bash
		source /home/vagrant/.rvm/scripts/rvm
		rvm requirements
		rvm install 2.2.1 --quiet-curl --quiet
		rvm use 2.2.1 --default
		echo "gem: --no-ri --no-rdoc" > ~/.gemrc
		gem install bundler
		cd /vagrant
		bundle
	SHELL
end
